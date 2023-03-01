﻿using el_proyecte_grande_backend.Models.Dtos.GuestDtos;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using el_proyecte_grande_backend.Services.GuestServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande_backend.Controllers
{
    [ApiController, Route("/api/guest")]
    [Authorize(Roles = "Admin,Manager,Receptionist")]
    public class GuestController : ControllerBase
    {
        private readonly IGuestService _repository;

        public GuestController(IGuestService repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GuestDto>>> GetAllGuests()
        {
            IEnumerable<Guest> guests = await _repository.GetAllGuestsAsync();
            IEnumerable<GuestDto> result = MakeGuestDtos(guests);

            return Ok(result);
        }

        [HttpGet("{guestId}")]
        public async Task<ActionResult<GuestDto>> GetGuestById(long id)
        {
            Guest? guest = await _repository.GetGuestByIdAsync(id);

            return guest == null ? NotFound() : Ok(MakeGuestDto(guest));
        }

        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<GuestDto>>> GetHotelGuests(long hotelId)
        {
            IEnumerable<Guest> guests = await _repository.GetAllGuestByHotelAsync(hotelId);
            IEnumerable<GuestDto> result = MakeGuestDtos(guests);

            return Ok(result);
        }

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<GuestDto>>> GetFilteredGuestsAsync(long? hotelId, GuestStatus? guestStatus)
        {
            IEnumerable<Guest> guests = await _repository.GetFilteredGuestListAsync(hotelId, guestStatus);
            IEnumerable<GuestDto> result = MakeGuestDtos(guests);

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> PostGuest(GuestUpdateDto guest)
        {
            if (!ValidateGuestObject(guest))
            {
                return BadRequest();
            }

            try
            {
                Guest? result = await _repository.AddGuestAsync(guest);

                return result != null ? Ok() : StatusCode(500);
            }
            catch (Exception e) 
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("{guestId}")]
        public async Task<ActionResult> UpdateGuest(long guestId, GuestUpdateDto guest)
        {
            bool guestIdIsNotValid = guestId != guest.Id;
            if (guestIdIsNotValid || !ValidateGuestObject(guest))
            {
                return BadRequest();
            }

            Guest? fromDb = await _repository.GetGuestByIdAsync(guestId);
            if (fromDb == null)
            {
                return NotFound();
            }

            Guest? result = await _repository.UpdateGuestAsync(guestId, guest);

            return result != null ? Ok() : StatusCode(500);
        }

        [HttpPut("status/{guestId}")]
        public async Task<ActionResult> UpdateGuestStatus(long guestId, int guestStatus)
        {
            Guest? fromDb = await _repository.GetGuestByIdAsync(guestId);
            if (fromDb == null)
            {
                return NotFound();
            }

            Guest? result = await _repository.UpdateGuestStatusAsync(guestId, guestStatus);

            return result != null ? Ok() : StatusCode(500);

        }

        private bool ValidateGuestObject(GuestUpdateDto guest)
        {
            if( guest.PersonalId == null
                || guest.FirstName == null
                || guest.LastName == null
                || guest.Email == null
                || guest.Phone == null
                || guest.BirthPlace == null
                || guest.Note == null
                || guest.Address == null)
            {
                return false;
            }
            bool hasProperValuesBasedOnStatus = guest.Status == Models.Enums.GuestStatus.CheckedOut
                || (guest.Status == Models.Enums.GuestStatus.CheckedIn
                    && guest.HotelId != null
                    && guest.HotelId > 0
                    && guest.RoomId != null
                    && guest.RoomId > 0
                    /*&& guest.ReservationIds != null
                    && guest.ReservationIds.Count > 0*/);

            return hasProperValuesBasedOnStatus;
        }

        private IEnumerable<GuestDto> MakeGuestDtos(IEnumerable<Guest> guests)
        {
            List<GuestDto> result = new List<GuestDto>();
            guests.ToList().ForEach(g => result.Add(MakeGuestDto(g)));

            return result;
        }

        private GuestDto MakeGuestDto(Guest guest)
        {
            GuestDto result = new GuestDto()
            {
                Id = guest.Id,
                PersonalId = guest.PersonalId,
                FirstName = guest.FirstName,
                LastName = guest.LastName,
                BirthPlace = guest.BirthPlace,
                Phone = guest.Phone,
                Email = guest.Email,
                Note = guest.Note,
                BirthDate = guest.BirthDate,
                Gender = guest.Gender,
                Status = guest.Status,
                Address = guest.Address
            };
            if (guest.Hotel != null)
            {
                result.HotelId = guest.Hotel.Id;
            }
            if (guest.Room != null)
            {
                result.RoomId = guest.Room.Id;
            }
            return result;
        }


    }
}
