using AutoMapper;
using el_proyecte_grande_backend.Models.Dtos.Reservation;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Services.ReservationServices;
using el_proyecte_grande_backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace el_proyecte_grande_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin,Manager,Receptionist")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationRepository;
        private readonly IMapper _mapper;

        public ReservationController(IReservationService reservationRepository, IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _mapper = mapper;
        }



        // GET: api/Reservation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetAllReservationDTO>>> GetAllReservations()
        {
            IEnumerable<Reservation> reservations = await _reservationRepository.GetAllAsync();
            IEnumerable<GetAllReservationDTO> reservationDTOs = _mapper.Map<IEnumerable<GetAllReservationDTO>>(reservations);
            return Ok(reservationDTOs);
        }

        // GET: api/Reservation/Hotel/hotelId
        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<GetAllReservationDTO>>> GetHotelReservations(long hotelId)
        {
            IEnumerable<Reservation> reservations = await _reservationRepository.GetHotelReservations(hotelId);
            IEnumerable<GetAllReservationDTO> reservationDTOs = _mapper.Map<IEnumerable<GetAllReservationDTO>>(reservations);
            return Ok(reservationDTOs);
        }

        // GET: api/Reservation/flter
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<GetAllReservationDTO>>> GetFilteredReservations(
            string? boardType,
            string? paymentMethod,
            uint? reservedFor,
            bool? payFulfillment,
            DateTime? startDate,
            DateTime? endDate,
            long? hotelId
            )
        {
            IEnumerable<Reservation> reservations = await _reservationRepository.GetFilteredReservations(boardType, paymentMethod, reservedFor, payFulfillment, startDate, endDate, hotelId);
            IEnumerable<GetAllReservationDTO> reservationDTOs = _mapper.Map<IEnumerable<GetAllReservationDTO>>(reservations);
            return Ok(reservationDTOs);
        }


        // GET: api/Reservation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetReservationDTO>> GetReservation(long id)
        {
            Reservation? reservation = await _reservationRepository.GetWithDetailsAsync(id);

            if (reservation == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} does not exist" }));

            GetReservationDTO reservationDTO = _mapper.Map<GetReservationDTO>(reservation);
            return Ok(reservationDTO);
        }

        // GET: api/Reservation/emptyBetween
        [HttpGet("emptyBetween")]
        public async Task<ActionResult<IEnumerable<Room>>> GetEmptyRoomsForHotelBetween(long hotelId, DateTime startDate,
            DateTime endDate)
        {
            IEnumerable<Room> emptyRooms = await _reservationRepository.GetEmptyRoomsForHotelBetween(hotelId, startDate, endDate);
            IEnumerable<RoomDTOsForReservation> roomDTOs = _mapper.Map<IEnumerable<RoomDTOsForReservation>>(emptyRooms);
            return Ok(roomDTOs);
        }


        // POST: api/Reservation
        [HttpPost]
        public async Task<ActionResult<GetReservationDTO>> PostReservation(AddReservationDTO reservationDTO)
        {
            Reservation reservationToAdd = _mapper.Map<Reservation>(reservationDTO);

            Reservation createdReservation;
            try
            {
               createdReservation = await _reservationRepository.AddAsync(reservationToAdd, reservationDTO.RoomIds);
            }
            catch (Exception exc)
            {
                return Problem(exc.Message);
            }
         
            GetReservationDTO createdReservationDTO = _mapper.Map<GetReservationDTO>(createdReservation);

            return CreatedAtAction("GetReservation", new { id = createdReservation.Id }, createdReservationDTO);
        }

        // PUT: api/Reservation/5
        [HttpPut("{id}")]
        public async Task<IActionResult> SetReservationToBeCancelled(long id)  // sets isCancelled to true
        {
            Reservation? reservation = await _reservationRepository.GetWithDetailsAsync(id);

            if (reservation == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} does not exist" }));


            Reservation? updatedReservation;
            try
            {
                updatedReservation = await _reservationRepository.SetReservationToBeCancelled(id);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _reservationRepository.Exists(id))
                {
                    return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} was not found, it might have been deleted while trying to update" }));
                }
                else
                {
                    throw;
                }
            }

            GetReservationDTO updatedReservationDTO = _mapper.Map<GetReservationDTO>(updatedReservation);
            return Ok(updatedReservationDTO);
        }


        // PUT: /api/reservation/status/5
        [HttpPut("status/{id}")]
        public async Task<ActionResult<GetReservationDTO>> SetReservationPayFulfillment(long id, UpdateReservationDTO paymentMethod)
        {
            Reservation? reservation = await _reservationRepository.GetAsync(id);
            if (reservation == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} does not exist" }));

            KeyValuePair<string, int> paymentMethodKvp = EnumUtils.GetValuesOfEnum("PaymentMethod")!.Values.FirstOrDefault(e => e.Key == paymentMethod.PaymentMethod);
            if (paymentMethodKvp.Key == null)
                    return BadRequest(JsonConvert.SerializeObject(new { message = $"Reservation could not be updated" }));

            Reservation? updatedReservation = await _reservationRepository.SetReservationPayFulfillment(id, paymentMethodKvp.Value);

            if (updatedReservation == null)
                return BadRequest(JsonConvert.SerializeObject(new { message = $"Reservation could not be updated" }));

            GetReservationDTO updatedReservationDTO = _mapper.Map<GetReservationDTO>(updatedReservation);
            return Ok(updatedReservationDTO);
        }


        // DELETE: api/Reservation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(long id)
        {
            Reservation? reservation = await _reservationRepository.GetAsync(id);
            if (reservation == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} does not exist" }));

            await _reservationRepository.DeleteAsync(id);

            return Ok(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} has been deleted successfully" }));
        }



    }
}
