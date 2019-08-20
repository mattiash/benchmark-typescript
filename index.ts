import { Suite, Event } from 'benchmark'

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
        console.log(String(event.target))
    })
    .on('complete', function(this: Suite) {
        console.log(
            'Fastest is ' + this.filter('fastest').map((o: any) => o.name),
        )
    })
    // run async
    .run({ async: true })
