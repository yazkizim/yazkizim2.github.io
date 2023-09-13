---
layout: page
title: Faydalı
permalink: /blog/categories/faydalı/
---

<h5> {{ page.title }} </h5>

<div class="card">
{%- assign kelime = site.posts
                  | where: "category", {{ page.title }}
                -%}
{%- for post in kelime -%}
     <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{%- endfor -%}

</div>