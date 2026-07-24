import { readFileSync } from "node:fs";

const file = new URL("../data/phase-1.json", import.meta.url);
const data = JSON.parse(readFileSync(file, "utf8"));
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const countryIds = new Set(data.countries.map((country) => country.id));
const countryCodes = new Set(data.countries.map((country) => country.code));
const agendaIds = data.agendas.map((agenda) => agenda.id);
const denominatorAgendas = data.agendas.filter((agenda) => agenda.id !== "6A").map((agenda) => agenda.id);
const topicIds = data.topics.map((topic) => topic.id);
const regionIds = new Set(data.regions.map((region) => region.id));

assert(data.countries.length === 21, "委员国应为21个");
assert(countryIds.size === data.countries.length, "国家ID必须唯一");
assert(countryCodes.size === data.countries.length, "国家代码必须唯一");
assert(data.amendment_packages.length === data.metadata.official_amendment_packages, "正式修正案包数量与元数据不一致");
assert(new Set(data.amendment_packages.map((item) => item.agenda)).size === data.metadata.decisions_amended, "修正决定数量与元数据不一致");

let actionCells = 0;
let speechTurns = 0;
for (const country of data.countries) {
  assert(regionIds.has(country.region), `${country.id}的区域不存在`);
  assert(Object.keys(country.agendas).length === denominatorAgendas.length, `${country.id}的议程键数量不完整`);
  for (const agendaId of denominatorAgendas) {
    assert(Object.hasOwn(country.agendas, agendaId), `${country.id}缺少议程${agendaId}`);
    assert([0, 1, 2, 3].includes(country.agendas[agendaId]), `${country.id}议程${agendaId}行动值非法`);
    if (country.agendas[agendaId] > 0) actionCells += 1;
  }
  assert(Object.keys(country.speech_turns).length === denominatorAgendas.length, `${country.id}的发言回合议程键不完整`);
  for (const agendaId of denominatorAgendas) {
    assert(Object.hasOwn(country.speech_turns, agendaId), `${country.id}缺少议程${agendaId}的发言回合`);
    assert(Number.isInteger(country.speech_turns[agendaId]) && country.speech_turns[agendaId] >= 0, `${country.id}议程${agendaId}发言回合非法`);
    assert(country.speech_turns[agendaId] === 0 || country.agendas[agendaId] > 0, `${country.id}议程${agendaId}有发言回合却无行动记录`);
    speechTurns += country.speech_turns[agendaId];
  }
  assert(Object.keys(country.topics).length === topicIds.length, `${country.id}的议题键数量不完整`);
  for (const topicId of topicIds) {
    assert(Object.hasOwn(country.topics, topicId), `${country.id}缺少议题${topicId}`);
    assert([0, 1, 2, 3].includes(country.topics[topicId]), `${country.id}议题${topicId}显著度非法`);
  }
}

assert(actionCells === data.metadata.country_agenda_actions, "国家—议程行动总数与元数据不一致");
assert(speechTurns === data.metadata.verified_speech_turns, "可核对发言回合总数与元数据不一致");

for (const item of data.amendment_packages) {
  assert(agendaIds.includes(item.agenda), `${item.id}引用未知议程`);
  assert(typeof item.short_label === "string" && item.short_label.length > 0, `${item.id}缺少悬停关键词提要`);
  for (const actor of item.actors) {
    assert(countryIds.has(actor.country), `${item.id}引用未知国家${actor.country}`);
  }
}

for (const item of data.accepted_oral_actions) {
  assert(agendaIds.includes(item.agenda), `口头行动引用未知议程${item.agenda}`);
  assert(countryIds.has(item.country), `口头行动引用未知国家${item.country}`);
}

if (failures.length) {
  console.error(`数据校验失败（${failures.length}项）`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`数据校验通过：${data.countries.length}国，${actionCells}个国家—议程行动，${speechTurns}个可核对发言回合，${data.amendment_packages.length}组书面修正案，${data.metadata.decisions_amended}项决定被修正。`);
