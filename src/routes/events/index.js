import { Router } from 'express';
import SiteEventController from '../../controllers/eventos.controllers';
import SiteEvent from '../../models/SiteEvent';
import Autocomplete from '../../controllers/autocomplete.controller';

const router = Router();
const siteEventController = new SiteEventController(SiteEvent.SiteEvent);
const autocomplete = new Autocomplete(SiteEvent.SiteEvent);

router.post('/events', (req, res) => siteEventController.create(req, res));
router.get('/events', (req, res) => siteEventController.get(req, res));
router.get('/events/autocomplete/:searche', (req, res) => autocomplete.get(req, res));


export default router;