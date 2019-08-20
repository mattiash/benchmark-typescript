import { Suite, Event } from 'benchmark'
const prettyMs = require('pretty-ms')

const suite = new Suite()

// add tests
suite
    .add('RegExp#test', function() {
        ;/o/.test('Hello World!')
    })
    .add('String#indexOf', function() {
        'Hello World!'.indexOf('o') > -1
    })
    // add listeners
    .on('cycle', (event: Event) => {
        const stats = (event.target as any).stats
        console.log(String(event.target))
        console.log(
            'Mean: ' +
                prettyMs(stats.mean * 1000, {
                    formatSubMilliseconds: true,
                    verbose: true,
                }),
        )
    })
    .on('complete', function(this: Suite) {
        console.log(
            'Fastest is ' + this.filter('fastest').map((o: any) => o.name),
        )
    })
    // run async
    .run({ async: true })
