using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Services.HotelServices
{
    public interface IHotelService
    {
        public Task<IEnumerable<Hotel>> GetAllHotels();
        public Task<Hotel> GetHotel(long id);
        public Task<Hotel> AddHotel(Hotel hotel);
        public Task<Hotel> UpdateHotel(long hotelId, Hotel hotel);
        public Task<Hotel> SetHotelStatus(long hotelId, HotelStatus status);
    }
}
