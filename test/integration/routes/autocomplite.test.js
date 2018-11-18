import Database from '../../../src/models/SiteEvent';


describe('Routes: Autocomplite', () => {
	let request;
	before(() => {
		return setupApp()
			.then(app => {
				request = supertest(app);
			});
	});
    
	
	const defaultEvent = {
		event: 'buy',
		timestamp: '2016-09-22T16:57:31.231Z'
	};
	const expectedEvent = {               
		data: [
            "buy",
        ]   
	};

	const params = 'bu'
	beforeEach(() => {
        
		const siteEvent = new Database.SiteEvent(defaultEvent);
        
        
		siteEvent._id = '56cb91bdc3464f14678934ca';
        
		return Database.SiteEvent.remove({})        
			.then(() => siteEvent.save());
	});
    
	afterEach(()=> Database.SiteEvent.remove({}));

	describe('GET /api/v1/events/autocomplite/:searche', () => {
		before(() => {        

			const siteEvent = new Database.SiteEvent(defaultEvent);    
			siteEvent._id = '56cb91bdc3464f14678934ca';                     

			return siteEvent.save();
		});

		it('should return a list for autocomplite', done => {           
        
			request
				.get(`/api/v1/events/autocomplete/${params}`)
				.end((err, res) => {
                
					expect(res.body).to.eql(expectedEvent);
					if (err) return done(err);
					done();
				});
		});
	});
	
});


