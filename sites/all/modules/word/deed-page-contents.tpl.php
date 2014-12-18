<?php

?>
<div id="spalnik-container">
  <h2>Спальник</h2>
  <h3>Pinguin Trekking</h3>
  <p>Ми збираємо гроші на спальні мішки Pinguin Trekking для українських вояків. У них тепло навіть при -20. Допоможи нам – кожна гривня важлива.</p>
  <p><a href="#" class="form-trigger">Допомогти</a></p>
</div>
<div id="pay-form" class="popup-container">
  <a class="x" href="#">Закрити</a>
  <div class="content-wrapper">
    <img src="/<?php print $directory; ?>/images/pay-logo.png" width="150" height="150" class="logo" />
    <p>Ми збираємо гроші на спальні мішки Pinguin Trekking для українських вояків. У них тепло навіть при -20. Допоможи нам – кожна гривня важлива.</p>
    <form action="/ajax/liqpay" target="frame" method="post">
      <img src="/<?php print $directory; ?>/images/privat24.jpg" />
      <input type="text" name="amount" value="450" />
      <button type="submit">Допомогти</button>
    </form>
    <iframe name="frame"></iframe>
    <div class="rule"></div>
    <div class="credentials">
      <span>Отримувач:</span> Благодійний фонд «Підтримай армію України »<br />
      ЕГРПОУ 39199337<br />
      р / с 26077052752710<br />
      ПАТ КБ « ПРИВАТБАНК », МФО 300711<br />
    </div>
    <div class="rule2"></div>
  </div>
</div>