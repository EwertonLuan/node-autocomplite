
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
							for(var i in siteEvent){
								result.push(siteEvent[i].event);
							}
						}else{
							/**Adiciona apenas dez itens na lista  */
							for(var i = 0; i <= 9; i++){
								if(!result.find( list => list === siteEvent[i].event)){
									result.push(siteEvent[i].event);
								}
							}
						}
						res.status(200).json({data: result});
					});
            
			} else {            
				throw "Deve conter mais de dois caracteres";
			}        
		}catch(err){
			res.status(500).json({err: err});
		}
	}
}

export default Autocomplete;