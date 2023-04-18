import axios from "axios";
import { useEffect, useState } from "react"; //cambiarlo a folder utility ¿?

const useFetchAllLocations = () => {
    const [allLocations, setAllLocations] = useState([]);

    useEffect(() => {
        const storedLocations = localStorage.getItem("allLocations");

        if (storedLocations) {
            setAllLocations(JSON.parse(storedLocations));   //Para evitar request en cada Restart
        } else {
            axios
                .get("https://rickandmortyapi.com/api/location?page=1")
                .then((response) => {
                    const totalPages = response?.data.info.pages;
                    let requestCompleted = 0;
                    let allLocationsArray = [];

                    for (let i = 1; i <= totalPages; i++) {
                        axios
                            .get(`https://rickandmortyapi.com/api/location?page=${i}`)
                            .then((response) => {
                                const locationNames = response?.data.results.map((location) => location.name);
                                allLocationsArray = allLocationsArray.concat(locationNames);
                                requestCompleted++;

                                if (requestCompleted === totalPages) {
                                    setAllLocations(allLocationsArray); //IMPORTANTE
                                    localStorage.setItem("allLocations", JSON.stringify(allLocationsArray)); //new Para evitar request
                                    //NOTA: En localStorage, esta almacenado de 0 a 125
                                }
                            })
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);

    return [allLocations];
};

export default useFetchAllLocations;



/* 
[
    "Earth (C-137)",
    "Abadango",
    "Citadel of Ricks",
    "Worldender's lair",
    "Anatomy Park",
    "Interdimensional Cable",
    "Immortality Field Resort",
    "Post-Apocalyptic Earth",
    "Purge Planet",
    "Venzenulon 7",
    "Bepis 9",
    "Cronenberg Earth",
    "Nuptia 4",
    "Giant's Town",
    "Bird World",
    "St. Gloopy Noops Hospital",
    "Earth (5-126)",
    "Mr. Goldenfold's dream",
    "Gromflom Prime",
    "Earth (Replacement Dimension)",
    "Glorzo Asteroid",
    "Alien Acid Plant",
    "Merged Universe",
    "Near-Duplicate Reality",
    "NX-5 Planet Remover",
    "Gaia",
    "Defiance's Ship",
    "Defiance's Base",
    "The Ocean",
    "Narnia Dimension",
    "Elemental Rings",
    "Morglutz",
    "Ferkus 9",
    "Morty",
    "Space",
    "Hell",
    "Z. Q. P. D.",
    "Space Tahoe",
    "France",
    "Birdperson's Consciousness",
    "Rick's Consciousness",
    "Avian Planet",
    "Normal Size Bug Dimension",
    "Slartivart",
    "Rick and Two Crows Planet",
    "Rick's Memories",
    "Testicle Monster Dimension",
    "Signus 5 Expanse",
    "Earth (C-500A)",
    "Rick's Battery Microverse",
    "The Menagerie",
    "Earth (K-83)",
    "Hideout Planet",
    "Unity's Planet",
    "Dorian 5",
    "Earth (Unknown dimension)",
    "Earth (J19ζ7)",
    "Roy: A Life Well Lived",
    "Eric Stoltz Mask Earth",
    "Earth (Evil Rick's Target Dimension)",
    "Planet Squanch",
    "Glaagablaaga",
    "Resort Planet",
    "Interdimensional Customs",
    "Galactic Federation Prison",
    "Gazorpazorp",
    "Hamster in Butt World",
    "Earth (Giant Telepathic Spiders Dimension)",
    "Alphabetrium",
    "Jerryboree",
    "Krootabulon",
    "Zigerion's Base",
    "Pluto",
    "Fantasy World",
    "Zeep Xanflorp's Miniverse",
    "Kyle's Teenyverse",
    "Larva Alien's Planet",
    "Earth (K-22)",
    "Mr. Meeseeks Box",
    "Vindicator's Base",
    "Pawn Shop Planet",
    "Mega Gargantuan Kingdom",
    "Gear World",
    "Earth (D-99)",
    "Earth (D716)",
    "Earth (D716-B)",
    "Earth (D716-C)",
    "Earth (J-22)",
    "Froopyland",
    "Detoxifier",
    "Trunk World",
    "Plopstar",
    "Blips and Chitz",
    "Girvonesk",
    "Earth (C-35)",
    "Snuffles' Dream",
    "Earth (Pizza Dimension)",
    "Earth (Phone Dimension)",
    "Greasy Grandma World",
    "Earth (Chair Dimension)",
    "Árboles Mentirosos",
    "Alien Day Spa",
    "Earth (Fascist Dimension)",
    "Snake Planet",
    "Forbodulon Prime",
    "Earth (Fascist Shrimp Dimension)",
    "Earth (Fascist Teddy Bear Dimension)",
    "Earth (Wasp Dimension)",
    "Monogatron Mothership",
    "Gorgon Quadrant",
    "Midland Quasar",
    "Mount Space Everest",
    "Globaflyn",
    "Heist-Con",
    "Heistotron Base",
    "Mount Olympus",
    "Plitzville Montana",
    "Earth (Tusk Dimension)",
    "Gramuflack",
    "Draygon",
    "New Improved Galactic Federation Quarters",
    "Story Train",
    "Non-Diegetic Alternative Reality",
    "Tickets Please Guy Nightmare",
    "Morty’s Story",
    "Ricks’s Story"
]
*/