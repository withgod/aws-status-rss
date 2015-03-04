#!/usr/bin/env node
var client = require('cheerio-httpcli');
var opml   = require('opml-generator');
var header = {
    "title": "AWS Service status",
    "dateCreated": new Date(),
    "ownerName": "withgod"
};

var url = 'http://status.aws.amazon.com/';

var outlines = [];
client.fetch(url, function(err, $, res) {
    //NA_block, SA_block, EU_block, AP_block
    $('#AP_block tbody tr').each(function (index) {
        var tr      = $(this);
        var t_title = $(tr.find('td')[1]).text();
        var t_url   = url.replace(/\/$/, '') + tr.find('a[href]').attr('href');
        //console.dir([t_title, t_url]);
        outlines.push({
            text:      '',
            title:     t_title,
            type:      'rss',
            'xmlUrl':  t_url,
            'htmlUrl': url
        });
    });
    console.log(opml(header, outlines));
});


