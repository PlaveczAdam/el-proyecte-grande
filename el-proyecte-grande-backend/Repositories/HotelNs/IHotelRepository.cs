using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Repositories.HotelNs
{
    public interface IHotelRepository
    {
        public Task<IEnumerable<Hotel>> GetAllHotels();
        public Task<Hotel> GetHotel(int id);
        public Task<Hotel> AddHotel(Hotel hotel);
        public Task<Hotel> UpdateHotel(int hotelId, Hotel hotel);
        public Task<Hotel> SetHotelStatus(int hotelId, HotelStatus status);
    }
}
