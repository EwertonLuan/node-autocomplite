import Database from '../../../src/models/SiteEvent';


describe('Routes: SiteEvent', () => {
	let request;
	before(() => {
		return setupApp()
			.then(app => {
				request = supertest(app);
			});
	});
    
	const defaultId = '56cb91bdc3464f14678934ca';
	const defaultEvent = {
		event: 'buy',
		timestamp: '2016-09-22T16:57:31.231Z'
	};
	const expectedEvent = {               
		_id: '56cb91bdc3464f14678934ca',
		event: 'buy',
		timestamp:  '2016-09-22T16:57:31.231Z',
		__v: 0       
	};
	beforeEach(() => {
        
		const siteEvent = new Database.SiteEvent(defaultEvent);
        
        
		siteEvent._id = '56cb91bdc3464f14678934ca';
        
		return Database.SiteEvent.remove({})        
			.then(() => siteEvent.save());
	});
    
	afterEach(()=> Database.SiteEvent.remove({}));

	describe('GET /api/v1/events', () => {
		before(() => {        

			const siteEvent = new Database.SiteEvent(defaultEvent);    
			siteEvent._id = '56cb91bdc3464f14678934ca';                     

			return siteEvent.save();
		});

		it('should return a list of events', done => {           
        
			request
				.get('/api/v1/events')
				.end((err, res) => {
                
					expect(res.body).to.eql([expectedEvent]);
					if (err) return done(err);
					done();
				});
		});
	});
	describe('POST /api/v1/events', () => {
		context('when posting a event', () => {
			it('should return a new event with status code 201', done => {
				const customId = '56cb91bdc3464f14678934ba';
				const newEvent = Object.assign({},{ _id: customId, __v:0 }, defaultEvent);
				const expectedSavedEvent = {
					__v: 0,
					_id: customId,
					event: 'buy',
					timestamp:  '2016-09-22T16:57:31.231Z'

				};
				request
					.post('/api/v1/events')
					.send(newEvent)
					.end((err, res) => {
						expect(res.statusCode).to.eql(201);
						expect(res.body).to.eql(expectedSavedEvent);
						if (err) return done(err);
						done();
					});
			});
		});
	});
});


