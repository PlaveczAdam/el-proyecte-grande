using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Repositories.HotelNs
{
    public class HotelRepositorie : IHotelRepositorie
    {
        private readonly GrandeHotelContext _context;
        public HotelRepositorie(GrandeHotelContext context)
        {
            _context = context;
        }

        public Hotel AddHotel(Hotel hotel)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Hotel> GetAllHotels()
        {
            throw new NotImplementedException();
        }

        public Hotel GetHotel(int id)
        {
            throw new NotImplementedException();
        }

        public Hotel SetHotelStatus(int hotelId, int status)
        {
            throw new NotImplementedException();
        }

        public Hotel UpdateHotel(int hotelId, Models.Entities.Hotel hotel)
        {
            throw new NotImplementedException();
        }
    }
}
