
class Autocomplete {
	constructor(SiteEvent){
		this.SiteEvent = SiteEvent;
	}
    
	get(req, res) {
		const req_data = req.params.searche;
		try{
			/** requisição deve enviar mais de cois caracteres como parametro */
			if(req_data.length >= 2) {
				return this.SiteEvent.find({event: { $regex: `^${req_data}` }})
					.then(siteEvent => {
						const result = [];
						/**Verifica se retornou menos dez que itens */
						if(siteEvent.length <= 9){
							/**Adiciona apenas dez itens unicos na lista*/
							for(var i in siteEvent){
								if(!result.find( list => list === siteEvent[i].event)){
									result.push(siteEvent[i].event);
								}
							}
						}else{
							/**Adiciona apenas dez itens unicos na lista*/
							for(var i = 0; i <= 9; i++){
								if(!result.find( list => list === siteEvent[i].event)){
									result.push(siteEvent[i].event);
								}
							}
						}
						res.status(200).json({data: result});
					});
            
			} else {            
				throw "A busca deve conter no minimo dois caracteres";
			}        
		}catch(err){
			res.status(500).json({err: err});
		}
	}
}

export default Autocomplete;