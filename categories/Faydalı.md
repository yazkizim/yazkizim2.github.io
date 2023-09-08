---
layout: page
title: Toplu Sözleşme
permalink: /blog/categories/Toplu Sözleşme/
---

<h5> {{ page.title }} </h5>

<div class="card">
{% for post in site.categories.Toplu Sözleşme %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>