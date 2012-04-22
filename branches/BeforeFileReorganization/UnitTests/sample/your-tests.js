test('trim()', function () {
  equals(trim(''), '', '?????? ??????');
  ok(trim('   ') === '', '?????? ?? ?????????? ????????');
  same(trim(), '', '??? ?????????');

  equals(trim(' x'), 'x', '????????? ???????');
  equals(trim('x '), 'x', '???????? ???????');
  equals(trim(' x '), 'x', '??????? ? ????? ??????');
  equals(trim('    x  '), 'x', '????');
  equals(trim('    x   y  '), 'x   y', '???? ? ??????? ?????? ?????? ?? ???????');
});