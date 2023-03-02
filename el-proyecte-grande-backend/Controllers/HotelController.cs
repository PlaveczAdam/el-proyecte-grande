using el_proyecte_grande_backend.Models.Dtos.HotelNs;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using el_proyecte_grande_backend.Services.HotelServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande_backend.Controllers
{
    [ApiController, Route("/api/hotel")]
    public class HotelController : Controller
    {
        private readonly IHotelService _hotelRepository;
        public HotelController(IHotelService hotelRepository)
        {
            _hotelRepository = hotelRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<HotelDto>> GetAllHotels()
        {
            return (await _hotelRepository.GetAllHotels()).Select(MapHotelToDto);
        }

        [HttpGet("{hotelId}")]
        [Authorize]
        public async Task<HotelDto> GetHotelById(long hotelId)
        {
            return MapHotelToDto(await _hotelRepository.GetHotel(hotelId));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<HotelDto> AddHotel([FromBody] HotelDto hotelDto)
        {
            var hotel = await _hotelRepository.AddHotel(MapDtoToHotel(hotelDto));
            return MapHotelToDto(hotel);
        }

        [HttpPut("{hotelId}")]
        [Authorize(Roles = "Admin")]
        public async Task<HotelDto> UpdateHotel(long hotelId, [FromBody] HotelDto hotelDto)
        {
            var hotel = await _hotelRepository.UpdateHotel(hotelId, MapDtoToHotel(hotelDto));
            return MapHotelToDto(hotel);
        }

        [HttpPut("{hotelId}/{hotelStatus}")]
        [Authorize(Roles = "Admin")]
        public async Task UpdateStatus(long hotelId, HotelStatus hotelStatus)
        {
            await _hotelRepository.SetHotelStatus(hotelId, hotelStatus);
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

        private static Address MapDtoToAddress(AddressDto addressDto)
        {
            return new Address()
            {
                AddressLineOne = addressDto.AddressLineOne,
                AddressLineTwo = addressDto.AddressLineTwo,
                City = addressDto.City,
                Country = addressDto.Country,
                PostalCode = addressDto.PostalCode,
                Region = addressDto.Region
            };
        }

        private static HotelDto MapHotelToDto(Hotel hotel)
        {
            return new HotelDto(
                Id: hotel.Id,
                Address: MapAddressToDto(hotel.Address),
                Classification: hotel.Classification,
                Floor: hotel.Floor,
                HotelStatus: hotel.Status,
                Name: hotel.Name,
                Rooms: hotel.Rooms
            );
        }

        private static Hotel MapDtoToHotel(HotelDto hotelDto)
        {
            return new Hotel()
            {
                Address = MapDtoToAddress(hotelDto.Address),
                Classification = hotelDto.Classification,
                Floor = hotelDto.Floor,
                Name = hotelDto.Name,
                Rooms = hotelDto.Rooms,
                Status = hotelDto.HotelStatus
            };
        }
    }
}
