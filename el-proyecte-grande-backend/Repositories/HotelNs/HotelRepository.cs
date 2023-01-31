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

        public async Task<Hotel> SetHotelStatus(long hotelId, HotelStatus status)
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

        public async Task<Hotel> UpdateHotel(long hotelId, Hotel hotel)
        {
            var foundHotel = await _context.Hotels.Include(x => x.Address).SingleAsync(x => x.Id == hotelId);

            foundHotel.Status = hotel.Status;
            foundHotel.Floor = hotel.Floor;
            foundHotel.Rooms = hotel.Rooms;
            foundHotel.Classification = hotel.Classification;
            foundHotel.Name = hotel.Name;
            foundHotel.Address.PostalCode = hotel.Address.PostalCode;
            foundHotel.Address.Country = hotel.Address.Country;
            foundHotel.Address.Region = hotel.Address.Region;
            foundHotel.Address.City = hotel.Address.City;
            foundHotel.Address.AddressLineOne = hotel.Address.AddressLineOne;
            foundHotel.Address.AddressLineTwo = hotel.Address.AddressLineTwo;

            await _context.SaveChangesAsync();
            return foundHotel;

        }
    }
}
