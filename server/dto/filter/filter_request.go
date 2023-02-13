package filterdto

type FilterRequest struct {
	CityName string `json:"city_name"`
	TypeRent string `json:"type_rent"`
	Bedroom  int    `json:"bedroom"`
	Bathroom int    `json:"bathroom"`
	MinPrice int    `json:"min_price"`
	MaxPrice int    `json:"max_price"`
}
