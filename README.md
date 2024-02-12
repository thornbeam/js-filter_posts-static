# Multi filter: Protorype
for use with static content

## Example
index.html
~~~
<section class="filter-container">
  <ul class="category-links">
    <li class="index">
      <a href="#index">
        INDEX
      </a>
    </li>

    <li class="link id-all">
      <a href="#">
        ALL
        <div class="amount-posts"><!-- get amount of posts --></div>
      </a>
    </li>
    <li class="link id-##">
      <a href="#">
        CATEGORY 01
        <div class="amount-posts"><!-- get amount of posts --></div>
      </a>
    </li>
    ...
  </ul>

  <ul class="filter-buttons">
    <li class="button-group KEY">
      <div class="label">KEY</div>
      <div class="current-selection KEY"><!-- get current selection label via js --></div>
      <div class="remove-filter KEY">X</div>
      <ul class="items">
        <li class="item">
            <a href="VALUE" class="VALUE">VALUE</a>
        </li>
      </ul>
    </li>
    <li class="button-group KEY">
      <div class="label">KEY</div>
      <div class="current-selection KEY"><!-- get current selection label via js --></div>
      <div class="remove-filter KEY">X</div>
      <ul class="items">
        <li class="item">
            <a href="VALUE" class="VALUE">VALUE</a>
        </li>
      </ul>
    </li>
    ...
  </ul>

  <ul class="filter-keys hidden">
    <!-- pass keys to js -->
    <li class="key">KEY</li>
    <li class="key">KEY</li>
    ...
  </ul>
</section>

