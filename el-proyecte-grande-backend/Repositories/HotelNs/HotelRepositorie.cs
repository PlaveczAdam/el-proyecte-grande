using el_proyecte_grande_backend.Data;

namespace el_proyecte_grande_backend.Repositories.HotelNs
{
    public class HotelRepositorie : IHotelRepositorie
    {
        private readonly GrandeHotelContext _context;
        public HotelRepositorie(GrandeHotelContext context)
        {
            _context = context;
        }

        public Models.Entities.Hotel AddHotel()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Models.Entities.Hotel> GetAllHotels()
        {
            throw new NotImplementedException();
        }

        public Models.Entities.Hotel GetHotel(int id)
        {
            throw new NotImplementedException();
        }

        public Models.Entities.Hotel SetHotelStatus(int hotelId, int status)
        {
            throw new NotImplementedException();
        }

        public Models.Entities.Hotel UpdateHotel(int hotelId, Models.Entities.Hotel hotel)
        {
            throw new NotImplementedException();
        }
    }
}
