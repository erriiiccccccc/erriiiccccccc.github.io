// The questions Hui Sin's chat suggests, by topic. One list, used in three places:
//   - the chat (src/islands/arctic.js) shows five at a time and changes them after every answer
//   - the server (api/huisin.mjs) knows these are standalone questions, so their answers can be reused
//     instead of asking the model again for every visitor who taps the same chip
//   - the evals (scripts/huisin-evals.mjs) run every one as a question that must be answered
// Every question here is answered by a line in knowledge.mjs: add the fact there before adding a question here.
export const REACH = 'How do I reach him?'
export const SUGGEST = [
  ['work', 'What does Eric do?'], ['skills', 'Can he code in React?'], ['projects', "What's his best project?"], ['travel', 'Does he like hiking?'], ['reach', REACH],
  ['work', 'What did he do at Barclays?'], ['work', 'Is he open to work?'], ['work', 'Has he worked with real clients?'], ['work', 'What was his first job?'],
  ['skills', 'Which languages does he code in?'], ['skills', 'Does he know AI and machine learning?'], ['skills', 'Has he built robots?'],
  ['projects', "What's MedMatch?"], ['projects', 'How did he build this world?'], ['projects', 'What was his dissertation about?'], ['projects', 'Has he won a hackathon?'],
  ['travel', 'How many countries has he been to?'], ['travel', "What's the best place he's been?"], ['travel', 'Which mountains has he climbed?'], ['travel', 'What are his university badges?'],
  ['life', "What's his favourite food?"], ['life', 'What music does he like?'], ['life', 'Which sports does he play?'], ['life', 'What languages does he speak?'],
  ['world', 'What can I do in this world?'], ['world', 'Who are you, Hui Sin?'],
]
