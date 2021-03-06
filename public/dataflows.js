$(function () { // on dom ready

    $('#DataFlows').cytoscape({
        layout: {
            name: 'cose',
            padding: 10
        },

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'shape': 'rectangle',
                'width': 'label',
                'height': 'label',
                'content': 'data(name)',
                'text-wrap': 'wrap',
                'text-valign': 'center',
                'text-outline-width': 2,
                'text-outline-color': 'data(faveColor)',
                'padding-top': '5px',
                'padding-left': '10px',
                'padding-bottom': '5px',
                'padding-right': '10px',
                'background-color': 'data(faveColor)',
                'color': '#fff'
            })
            .selector(':selected')
            .css({
                'border-width': 3,
                'border-color': '#333'
            })
            .selector('edge')
            .css({
                'opacity': 0.666,
                'width': 2,
                'target-arrow-shape': 'triangle',
                'source-arrow-shape': 'circle',
                'line-color': 'data(faveColor)',
                'source-arrow-color': 'data(faveColor)',
                'target-arrow-color': 'data(faveColor)',
                'label': 'data(label)',
                'curve-style': 'bezier'
            })
            .selector('edge.questionable')
            .css({
                'line-style': 'dotted',
                'target-arrow-shape': 'diamond',
                'label': 'data(label)'
            })
            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            }),

        elements: {
            nodes: [
                {data: {id: 'atb', name: 'analytics\ntoolbox', weight: 65, faveColor: '#E0A2A2', faveShape: 'ellipse'}},
                {data: {id: 'alcds', name: 'analytics\nlcds\nadaptor', weight: 45, faveColor: '#F5A45D', faveShape: 'octagon'}},
                {data: {id: 'atbmp', name: 'analytics\ntoolbox\nmessage\nprocessor', weight: 45, faveColor: 'red', faveShape: 'rectangle'}},
                {data: {id: 'adp', name: 'analytics\ndata\nprovider', weight: 75, faveColor: 'red', faveShape: 'rectangle'}},
                {data: {id: 'ars', name: 'analytics\nrestful\nservice', weight: 70, faveColor: 'green', faveShape: 'roundrectangle'}}
            ],
            edges: [
                {data: {source: 'atb', target: 'alcds', faveColor: 'red', strength: 90, label: '29west'}},
                {data: {source: 'alcds', target: 'atbmp', faveColor: 'red', strength: 70, label: '29west'}},
                {data: {source: 'alcds', target: 'adp', faveColor: 'red', strength: 80, label: '29west'}},
                {data: {source: 'adp', target: 'ars', faveColor: 'green', strength: 95, label: 'rest'}}
            ]
        },

        ready: function () {
            window.DataFlows = this;

            // giddy up
        }
    });

}); // on dom ready
