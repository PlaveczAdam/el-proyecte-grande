using el_proyecte_grande_backend.Models.Dtos.HotelNs;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Repositories.HotelNs;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande_backend.Controllers
{
    [ApiController, Route("/api/hotel")]
    public class HotelController : Controller
    {
        private IHotelRepository _hotelRepository;
        public HotelController(IHotelRepository hotelRepository)
        {
            _hotelRepository = hotelRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<HotelDto>> GetAllHotels()
        {
            return (await _hotelRepository.GetAllHotels()).Select(MapHotelToDto);
        }

        private static AddressDto MapAddressToDto(Address adress)
        {
            return new AddressDto(
                PostalCode: adress.PostalCode,
                AddressLineOne: adress.AddressLineOne,
                AddressLineTwo: adress.AddressLineTwo,
                City: adress.City,
                Country: adress.Country,
                Region: adress.Region
            );
        }
        private static HotelDto MapHotelToDto(Hotel hotel)
        {
            return new HotelDto(
                Id: hotel.Id,
                Adress: MapAddressToDto(hotel.Address),
                Classification: hotel.Classification,
                Floor: hotel.Floor,
                HotelStatus: hotel.Status,
                Name: hotel.Name,
                Rooms: hotel.Rooms
            );
        }
    }
}
