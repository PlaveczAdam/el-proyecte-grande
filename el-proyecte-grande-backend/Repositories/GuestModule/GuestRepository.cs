using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using el_proyecte_grande_backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.Metadata;

namespace el_proyecte_grande_backend.Repositories.GuestModule
{
    public class GuestRepository : IGuestRepository
    {
        private readonly GrandeHotelContext _dbContext;

        public GuestRepository(GrandeHotelContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guest?> AddGuestAsync(Guest guest)
        {
            try
            {
                guest.Hotel = await GetGuestHotel(guest);
                guest.Room = await GetGuestRoom(guest);
                guest.Reservations = await GetGuestReservations(guest);
            }
            catch(Exception)
            {
                throw;
            }

            if(guest.Reservations != null)
            {
                if (!await AllReservationIsInTheDatabase(guest.Reservations))
                {
                    throw new InvalidOperationException("One or more reservation(s) with the given Id(s) not exits in the database");
                }
                
                List<Reservation> reservations = await GetReservationsFromDb(guest.Reservations);
                guest.Reservations = reservations;
            }

            await _dbContext.Guests.AddAsync(guest);
            int affectedRows = await _dbContext.SaveChangesAsync();

            return affectedRows > 0 ? guest : null;
        }

        public Task<IEnumerable<Guest>> GetAllGuestByHotelAsync(long hotelId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Guest>> GetAllGuestsAsync()
        {
            IEnumerable<Guest> result = await GetGuestsWithAllDetails();

            return result;
        }


        public async Task<IEnumerable<Guest>> GetFilteredGuestListAsync(long? hotelId, GuestStatus? guestStatus)
        {
            IEnumerable<Guest> result = await GetGuestsWithAllDetails();

            if (hotelId != null)
            {
                result = result.Where(r => r.Hotel != null && r.Hotel.Id == hotelId).ToList();
            }

            if (guestStatus != null)
            {
                result = result.Where(r => r.Status == guestStatus).ToList();
            }

            return result;
        }

        public Task<Guest?> GetGuestByIdAsync(long guestId)
        {
            throw new NotImplementedException();
        }

        public async Task<Guest?> UpdateGuestAsync(long guestId, Guest guest)
        {
            if (guestId != guest.Id)
            {
                throw new InvalidOperationException("Guest Id modification is nat allowed.");
            }

            Guest? fromdb = await _dbContext.Guests.FirstOrDefaultAsync(g => g.Id == guestId);
            if (fromdb == null)
            {
                return null;
            }

            try
            {
                fromdb.Hotel = await GetGuestHotel(guest);
                fromdb.Room = await GetGuestRoom(guest);
                fromdb.Reservations = await GetGuestReservations(guest);

            }
            catch (Exception)
            {

                throw;
            }

            fromdb.Address = guest.Address;
            fromdb.BirthDate = guest.BirthDate;
            fromdb.BirthPlace = guest.BirthPlace;
            fromdb.Email = guest.Email;
            fromdb.FirstName = guest.FirstName;
            fromdb.LastName = guest.LastName;
            fromdb.Phone = guest.Phone;
            fromdb.Gender = guest.Gender;
            fromdb.Note = guest.Note;
            fromdb.PersonalId = guest.PersonalId;
            fromdb.Status = guest.Status;

            await _dbContext.SaveChangesAsync();

            return fromdb;
        }

        public Task<Guest?> UpdateGuestStatusAsync(long guestId, int guestStatus)
        {
            throw new NotImplementedException();
        }
        private async Task<IEnumerable<Guest>> GetGuestsWithAllDetails()
        {
            List<Guest> result = await _dbContext.Guests.Include(g => g.Address).Include(g => g.Reservations).Include(g => g.Hotel).Include(g => g.Room).ToListAsync();
            
            return result;
        }

        private async Task<bool> HotelIsInTheDatabase(long hotelId)
        {
            Hotel? hotel = await _dbContext.Hotels.FirstOrDefaultAsync(h => h.Id == hotelId);
            return hotel != null;
        }
        
        private async Task<bool> RoomIsInTheDatabase(long roomId)
        {
            Room? room = await _dbContext.Rooms.FirstOrDefaultAsync(r => r.Id == roomId);
            return room != null;
        }
        private async Task<bool> AllReservationIsInTheDatabase(ICollection<Reservation> reservations)
        {
            bool valid = true;
            List<Reservation> allReservatrions = await _dbContext.Reservations.ToListAsync();

            reservations.ToList().ForEach(r =>
            {
                if (allReservatrions.FirstOrDefault(res => res.Id == r.Id) == null)
                {
                    valid = false;
                }
            });
            
            return valid;
        }

        private async Task<Hotel?> GetGuestHotel(Guest guest)
        {
            if (guest.Hotel != null)
            {
                if (!await HotelIsInTheDatabase(guest.Hotel.Id))
                {
                    throw new InvalidOperationException("There is no hotel with the given Id in the database");
                }
                Hotel hotel = await _dbContext.Hotels.FirstAsync(h => h.Id == guest.Hotel.Id);
                return hotel;
            }

            return null;
        }
        
        private async Task<Room?> GetGuestRoom(Guest guest)
        {
            if (guest.Room != null)
            {
                if (!await RoomIsInTheDatabase(guest.Room.Id))
                {
                    throw new InvalidOperationException("There is no room with the given Id in the database");
                }

                Room room = await _dbContext.Rooms.FirstAsync(r => r.Id == guest.Room.Id);
                return room;
            }

            return null;
        }
        
        private async Task<ICollection<Reservation>?> GetGuestReservations(Guest guest)
        {
            if (guest.Reservations != null)
            {
                if (!await AllReservationIsInTheDatabase(guest.Reservations))
                {
                    throw new InvalidOperationException("One or more reservation(s) with the given Id(s) not exits in the database");
                }

                List<Reservation> reservations = await GetReservationsFromDb(guest.Reservations);
                return reservations;
            }

            return null;
        }

        private async Task<List<Reservation>> GetReservationsFromDb(ICollection<Reservation> reservations)
        {
            List<Reservation> AllReservations = await _dbContext.Reservations.ToListAsync();
            List<Reservation> result = new List<Reservation>();
            reservations.ToList().ForEach(r =>
            {
                result.Add(AllReservations.First(res => res.Id == r.Id));
            });

            return result;
        }
    }
}
