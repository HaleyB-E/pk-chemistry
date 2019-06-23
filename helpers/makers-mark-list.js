// a list of all makers marks (and the filename for them)
var makersMarks = makersMarks ||  (function() {
  function getMakersMarkList() {
    return [
      'auntie',
      'serelia',
      'serendipity',
      'ursula',
      'melope'
    ]
  }
  return {
    getMakersMarkList: getMakersMarkList
  }
}());