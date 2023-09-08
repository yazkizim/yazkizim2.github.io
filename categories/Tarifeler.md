---
layout: page
title: Tarifeler
permalink: /blog/categories/Tarifeler/
---

<h5> {{ page.title }} </h5>

<div class="card">
{% for post in site.categories.Tarifeler %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>