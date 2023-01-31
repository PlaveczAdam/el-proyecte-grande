using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Repositories.HotelRepositorie
{
    public interface IHotelRepositorie
    {
        public IEnumerable<Hotel> GetAllHotels();
        public Hotel GetHotel(int id);
        public Hotel AddHotel();
        public Hotel UpdateHotel(int hotelId, Hotel hotel);
        public Hotel SetHotelStatus(int hotelId, int status);
    }
}
