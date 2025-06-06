import { createSlice } from "@reduxjs/toolkit";
const places = localStorage.getItem("places")
    ? JSON.parse(localStorage.getItem("places") || "")
    : null;
const initialState = {
    places: places,
    activePlaceId:null,
    isChatBotOpen: false,
};

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        setPlaces: (state, action) => {
            state.places = action.payload;
            localStorage.setItem("places", JSON.stringify(action.payload));
        },
        addPlace: (state, action) => {
            state.places.push(action.payload);
            localStorage.setItem("places", JSON.stringify(state.places));
        },
        setActivePlaceId: (state, action) => {
            state.activePlaceId = action.payload;
        },
        setChatbotOpen: (state, action) => {
            state.isChatBotOpen = action.payload;
        },
        setReview: (state, action) => {
            const { placeId, summarizedReview,itineraryIdx } = action.payload;
            console.log("Place ID:", placeId, "Summarized Review:", summarizedReview, "Itinerary Index:", itineraryIdx);
            console.log("Places before update:", places);
            const placeIndex = state.places[itineraryIdx].map((days:any)=>{
                return days.map((place:any)=>{
                    return {
                        ...place,
                        summarizedReview:(place.id==placeId)?summarizedReview:place.summarizedReview
                    }
                })
            })
            state.places[itineraryIdx] = placeIndex;
            localStorage.setItem("places", JSON.stringify(state.places));
        },
    },
});
export const { setPlaces, addPlace,setActivePlaceId,setChatbotOpen,setReview } = placeSlice.actions;
export default placeSlice.reducer;