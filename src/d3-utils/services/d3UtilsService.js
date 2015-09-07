angular.module('d3.utils')
    .factory('d3UtilsService', [function () {
        return {
            wrapSVGText: function (textNode, caption, x, y, maxChars, lineHeight) {
                //  This function attempts to create a new svg "text" element, chopping 
                //  it up into "tspan" pieces, if the caption is too long
                //
                textNode.attr('y', y)
                    .attr('x', x);

                var words = caption.split(" "),
                    line = "",
                    n = 0,
                    testLine = "";

                for (n = 0; n < words.length; n++) {
                    testLine = line + words[n] + " ";
                    if (testLine.length > maxChars) {
                        //  Add a new <tspan> element
                        textNode.append('tspan')
                            .attr('x', x)
                            .attr('y', y)
                            .text(line);

                        line = words[n] + " ";
                        y = lineHeight + y;
                    } else {
                        line = testLine;
                    }
                }

                textNode.append('tspan')
                    .attr('x', x)
                    .attr('y', y)
                    .text(line);

                return textNode;
            }
        };
     }]);