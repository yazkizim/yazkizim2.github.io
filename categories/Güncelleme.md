---
layout: page
title: Güncelleme
permalink: /blog/categories/Güncelleme/
---

<h5> {{ page.title }} </h5>

<div class="card">
{%- assign kelime = site.posts
                  | where: "category", {{ page.title }}
                -%}
{%- for post in kelime -%}
     <li class="category-posts"><span>{% assign m = post.date | date: "%-m" %}
{{ page.date | date: "%-d" }}
{% case m %}
    {% when '1' %}Ocak
    {% when '2' %}Şubat
    {% when '3' %}Mart
    {% when '4' %}Nisan
    {% when '5' %}Mayıs
    {% when '6' %}Haziran
    {% when '7' %}Temmuz
    {% when '8' %}Ağustos
    {% when '9' %}Eylül
    {% when '10' %}Ekim
    {% when '11' %}Kasım
    {% when '12' %}Aralık
{% endcase %}
{{ page.date | date: "%Y" }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{%- endfor -%}

</div>