package handlers

import (
	"encoding/json"
	"fmt"
	housesdto "housy/dto/house"
	dto "housy/dto/result"
	"housy/models"
	"housy/repositories"
	"net/http"
	"os"
	"strconv"

	"context"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"gorm.io/datatypes"
)

var path_file = os.Getenv("PATH_FILE")

type handlerHouse struct {
	HouseRepository repositories.HouseRepository
}

func HandlerHouse(HouseRepository repositories.HouseRepository) *handlerHouse {
	return &handlerHouse{HouseRepository}
}

func (h *handlerHouse) FindHouses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	houses, err := h.HouseRepository.FindHouses()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	// for i, p := range houses {
	// 	houses[i].Image = path_file + p.Image
	// }

	for i, p := range houses {
		imagePath := os.Getenv("PATH_FILE") + p.Image
		houses[i].Image = imagePath
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: houses}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerHouse) FindHousesFilter(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	querParams := r.URL.Query()

	price, _ := strconv.Atoi(querParams.Get("price"))

	houses, err := h.HouseRepository.FindHousesFilter(price)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	for i, p := range houses {
		houses[i].Image = path_file + p.Image
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: houses}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerHouse) GetHouse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	house, err := h.HouseRepository.GetHouse(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// house.Image = path_file + house.Image

	house.Image = os.Getenv("PATH_FILE") + house.Image

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseHouse(house)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerHouse) CreateHouse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// dataContex := r.Context().Value("dataFile") // add this code
	// filename := dataContex.(string)             // add this code
	dataContex := r.Context().Value("dataFile")
	filepath := dataContex.(string)

	price, _ := strconv.Atoi(r.FormValue("price"))
	bedroom, _ := strconv.Atoi(r.FormValue("bedroom"))
	bathroom, _ := strconv.Atoi(r.FormValue("bathroom"))
	request := housesdto.HouseRequest{
		Name:        r.FormValue("name"),
		CityName:    r.FormValue("city_name"),
		Address:     r.FormValue("address"),
		TypeRent:    r.FormValue("type_rent"),
		Description: r.FormValue("description"),
		Area:        r.FormValue("area"),
		Amenities:   datatypes.JSON(r.FormValue("amenities")),
		Price:       price,
		Bedroom:     bedroom,
		Bathroom:    bathroom,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "housy"})

	if err != nil {
		fmt.Println(err.Error())
	}

	house := models.House{
		Name:        request.Name,
		CityName:    request.CityName,
		Address:     request.Address,
		Price:       request.Price,
		TypeRent:    request.TypeRent,
		Amenities:   request.Amenities,
		Description: request.Description,
		Area:        request.Area,
		Bedroom:     request.Bedroom,
		Bathroom:    request.Bathroom,
		Image:       resp.SecureURL,
	}

	house, err = h.HouseRepository.CreateHouse(house)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	house, _ = h.HouseRepository.GetHouse(house.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: house}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerHouse) DeleteHouse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	house, err := h.HouseRepository.GetHouse(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.HouseRepository.DeleteHouse(house)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

// Write this code
func (h *handlerHouse) UpdateHouse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// dataContex := r.Context().Value("dataFile") // add this code
	// filename := dataContex.(string)             // add this code

	dataContex := r.Context().Value("dataFile")
	filepath := dataContex.(string)

	price, _ := strconv.Atoi(r.FormValue("price"))
	bedroom, _ := strconv.Atoi(r.FormValue("bedroom"))
	bathroom, _ := strconv.Atoi(r.FormValue("bathroom"))
	request := housesdto.HouseRequest{
		Name:        r.FormValue("name"),
		CityName:    r.FormValue("city_name"),
		Address:     r.FormValue("address"),
		TypeRent:    r.FormValue("type_rent"),
		Description: r.FormValue("description"),
		Area:        r.FormValue("area"),
		Amenities:   datatypes.JSON(r.FormValue("amenities")),
		Price:       price,
		Bedroom:     bedroom,
		Bathroom:    bathroom,
		// Image:       filepath,
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	house, err := h.HouseRepository.GetHouse(int(id))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Name != "" {
		house.Name = request.Name
	}

	if request.CityName != "" {
		house.CityName = request.CityName
	}

	if request.Address != "" {
		house.Address = request.Address
	}

	if request.Price != 0 {
		house.Price = request.Price
	}

	if request.TypeRent != "" {
		house.TypeRent = request.TypeRent
	}

	if request.Description != "" {
		house.Description = request.Description
	}

	if request.Amenities != nil {
		house.Amenities = request.Amenities
	}

	if request.Bedroom != 0 {
		house.Bedroom = request.Bedroom
	}

	if request.Bathroom != 0 {
		house.Bathroom = request.Bathroom
	}

	if request.Area != "" {
		house.Area = request.Area
	}

	if filepath != "false" {
		house.Image = filepath
	}

	data, err := h.HouseRepository.UpdateHouse(house)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func convertResponseHouse(u models.House) housesdto.HouseResponse {
	return housesdto.HouseResponse{
		ID:          u.ID,
		Name:        u.Name,
		CityName:    u.CityName,
		Address:     u.Address,
		Price:       u.Price,
		TypeRent:    u.TypeRent,
		Amenities:   u.Amenities,
		Description: u.Description,
		Area:        u.Area,
		Bedroom:     u.Bedroom,
		Bathroom:    u.Bathroom,
		Image:       u.Image,
	}
}
