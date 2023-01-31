using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace el_proyecte_grande_backend.Repositories.HotelNs
{
    public class HotelRepository : IHotelRepository
    {
        private readonly GrandeHotelContext _context;
        public HotelRepository(GrandeHotelContext context)
        {
            _context = context;
        }

        public async Task<Hotel> AddHotel(Hotel hotel)
        {
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();
            return hotel;
        }

        public async Task<IEnumerable<Hotel>> GetAllHotels()
        {
            return await _context.Hotels.Include(x => x.Address).ToListAsync();
        }

        public async Task<Hotel> GetHotel(long id)
        {
            var hotel = await _context.Hotels.Include(x => x.Address).SingleAsync(x => x.Id == id);
            return hotel;
        }

        public async Task<Hotel> SetHotelStatus(int hotelId, HotelStatus status)
        {
            var hotel = await _context.Hotels.FindAsync(hotelId);
            if (hotel is null)
            {
                throw new Exception("There is no hotel.");
            }
            hotel.Status = status;
            await _context.SaveChangesAsync();
            return hotel;
        }

        public async Task<Hotel> UpdateHotel(int hotelId, Hotel hotel)
        {
            var foundHotel = await _context.Hotels.FindAsync(hotelId);
            if (foundHotel is null)
            {
                throw new Exception("There is no hotel.");
            }
            foundHotel.Status = hotel.Status;
            foundHotel.Floor = hotel.Floor;
            foundHotel.Address = hotel.Address;
            foundHotel.Rooms = hotel.Rooms;
            foundHotel.Classification = hotel.Classification;
            foundHotel.Name = hotel.Name;

            await _context.SaveChangesAsync();
            return foundHotel;

        }
    }
}
