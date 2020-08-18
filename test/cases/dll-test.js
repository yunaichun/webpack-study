const glob = require('glob-all');

describe('Checking generated dll json files', () => {
    it('should generate dll json files', (done) => {
        const files = glob.sync([
            './build/library/library.json',
        ]);
        
        if (files.length > 0) {
            done();
        } else {
            throw new Error('no html files generated');
        }
    });
});
