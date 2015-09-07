angular.module("vitae.templates").run(["$templateCache", function($templateCache) {$templateCache.put("interests.html","<h2>INTERESTS</h2>\n<vitae-interests-chart data=\"data\" bar-height=\"30\" bar-padding=\"5\"></vitae-interests-chart>");
$templateCache.put("key-skills.html","<h2>KEY SKILLS</h2>\n<ul class=\'key-skills\'>\n    <li ng-repeat=\"skill in data\">{{skill}}</li>\n</ul>");
$templateCache.put("timeline.html","<h2>TIMELINE</h2>\n<vitae-timeline-chart data=\"data\"></vitae-timeline-chart>");
$templateCache.put("vitae.html","<div class=\"header\">\n    <vitae-name-header data=\"data\"></vitae-name-header>\n    <p><img src=\"images/glyphicons_020_home.png\" height=16/> {{data.address}}\n        <br/><img src=\"images/glyphicons_163_iphone.png\" height=16/> {{data.phone}}\n        <br/><img src=\"images/glyphicons_010_envelope.png\" height=13/> {{data.email}}\n    </p>\n</div>\n<vitae-key-skills data=\"data.keyskills\"></vitae-key-skills>\n<vitae-timeline data=\"data.experience\"></vitae-timeline>\n<vitae-interests data=\"data.interests\"></vitae-interests>");}]);