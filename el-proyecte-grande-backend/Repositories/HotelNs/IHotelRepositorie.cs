using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Repositories.HotelNs
{
    public interface IHotelRepositorie
    {
        public IEnumerable<Hotel> GetAllHotels();
        public Hotel GetHotel(int id);
        public Hotel AddHotel(Hotel hotel);
        public Hotel UpdateHotel(int hotelId, Hotel hotel);
        public Hotel SetHotelStatus(int hotelId, int status);
    }
}
