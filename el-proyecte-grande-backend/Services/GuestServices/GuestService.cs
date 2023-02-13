using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using el_proyecte_grande_backend.Data;
using Microsoft.EntityFrameworkCore;
using el_proyecte_grande_backend.Models.Dtos;

namespace el_proyecte_grande_backend.Services.GuestServices
{
    public class GuestService : IGuestService
    {
        private readonly GrandeHotelContext _dbContext;

        public GuestService(GrandeHotelContext dbContext)
        {
            _dbContext = dbContext;
            Seed();
        }



        public async Task<Guest?> AddGuestAsync(GuestUpdateDto guest)
        {
            Guest newGuest = MakeGuestFromDto(guest);
            try
            {
                newGuest.Hotel = await GetGuestHotel(guest.HotelId);
                newGuest.Room = await GetGuestRoom(guest.RoomId);
                newGuest.Reservations = await GetGuestReservations(guest.ReservationIds);
            }
            catch (Exception)
            {
                throw;
            }

            if (guest.ReservationIds != null)
            {
                if (!await AllReservationIsInTheDatabase(guest.ReservationIds))
                {
                    throw new InvalidOperationException("One or more reservation(s) with the given Id(s) not exits in the database");
                }

                List<Reservation> reservations = await GetReservationsFromDb(guest.ReservationIds);
                newGuest.Reservations = reservations;
            }

            await _dbContext.Guests.AddAsync(newGuest);
            int affectedRows = await _dbContext.SaveChangesAsync();

            return affectedRows > 0 ? newGuest : null;
        }


        public async Task<IEnumerable<Guest>> GetAllGuestByHotelAsync(long hotelId)
        {
            IEnumerable<Guest> guests = await GetGuestsWithAllDetails();
            IEnumerable<Guest> result = guests.Where(g => g.Hotel != null && g.Hotel.Id == hotelId);

            return result;
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

        public async Task<Guest?> GetGuestByIdAsync(long guestId)
        {
            IEnumerable<Guest> guests = await GetGuestsWithAllDetails();
            Guest? guest = guests.FirstOrDefault(r => r.Id == guestId);

            return guest;
        }

        public async Task<Guest?> UpdateGuestAsync(long guestId, GuestUpdateDto guest)
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
                fromdb.Hotel = await GetGuestHotel(guest.HotelId);
                fromdb.Room = await GetGuestRoom(guest.RoomId);
                fromdb.Reservations = await GetGuestReservations(guest.ReservationIds);

            }
            catch (Exception)
            {

                throw;
            }

            fromdb.Address.Country = guest.Address.Country;
            fromdb.Address.Region = guest.Address.Region;
            fromdb.Address.PostalCode = guest.Address.PostalCode;
            fromdb.Address.City = guest.Address.City;
            fromdb.Address.AddressLineOne = guest.Address.AddressLineOne;
            fromdb.Address.AddressLineTwo = guest.Address.AddressLineTwo;
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
            _dbContext.Update(fromdb);
            await _dbContext.SaveChangesAsync();

            return fromdb;
        }

        public async Task<Guest?> UpdateGuestStatusAsync(long guestId, int guestStatus)
        {
            Guest? fromdb = await _dbContext.Guests.FirstOrDefaultAsync(g => g.Id == guestId);
            if (fromdb != null)
            {
                fromdb.Status = (GuestStatus)guestStatus;
                await _dbContext.SaveChangesAsync();
            }

            return fromdb;

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
        private async Task<bool> AllReservationIsInTheDatabase(ICollection<long> reservationIds)
        {
            bool valid = true;
            List<Reservation> allReservatrions = await _dbContext.Reservations.ToListAsync();

            reservationIds.ToList().ForEach(r =>
            {
                if (allReservatrions.FirstOrDefault(res => res.Id == r) == null)
                {
                    valid = false;
                }
            });

            return valid;
        }

        private async Task<Hotel?> GetGuestHotel(long? hotelId)
        {
            if (hotelId != null)
            {
                if (!await HotelIsInTheDatabase(hotelId.Value))
                {
                    throw new InvalidOperationException("There is no hotel with the given Id in the database");
                }
                Hotel hotel = await _dbContext.Hotels.FirstAsync(h => h.Id == hotelId.Value);
                return hotel;
            }

            return null;
        }

        private async Task<Room?> GetGuestRoom(long? roomId)
        {
            if (roomId != null)
            {
                if (!await RoomIsInTheDatabase(roomId.Value))
                {
                    throw new InvalidOperationException("There is no room with the given Id in the database");
                }

                Room room = await _dbContext.Rooms.FirstAsync(r => r.Id == roomId.Value);
                return room;
            }

            return null;
        }

        private async Task<ICollection<Reservation>?> GetGuestReservations(ICollection<long>? reservationIds)
        {
            if (reservationIds != null)
            {
                if (!await AllReservationIsInTheDatabase(reservationIds))
                {
                    throw new InvalidOperationException("One or more reservation(s) with the given Id(s) not exits in the database");
                }

                List<Reservation> reservations = await GetReservationsFromDb(reservationIds);
                return reservations;
            }

            return null;
        }

        private async Task<List<Reservation>> GetReservationsFromDb(ICollection<long> reservationIds)
        {
            List<Reservation> AllReservations = await _dbContext.Reservations.ToListAsync();
            List<Reservation> result = new List<Reservation>();
            reservationIds.ToList().ForEach(r =>
            {
                result.Add(AllReservations.First(res => res.Id == r));
            });

            return result;
        }

        private void Seed()
        {
            if (_dbContext.Hotels.Count() == 0)
            {
                Hotel hotel = new Hotel()
                {
                    Address = new Address()
                    {
                        Country = "Hungary",
                        Region = "Borsod-Abaúj-Zemplén",
                        PostalCode = "3900",
                        City = "Szerencs",
                        AddressLineOne = "Ondi út 1",
                        AddressLineTwo = ""
                    },
                    Classification = Classification.Standard,
                    Floor = 1,
                    Name = "Name",
                    Rooms = 1,
                    Status = HotelStatus.InUse
                };

                RoomType roomType = new RoomType()
                {
                    Accessories = new List<Accessory>(),
                    Name = "Name",
                    Price = 5000,
                    RoomQuality = RoomQuality.Standard
                };

                Accessory accessory = new Accessory()
                {
                    Name = "Bed",
                    Quantity = 1,
                    RoomType = roomType
                };

                roomType.Accessories.Add(accessory);

                Room room = new Room()
                {
                    Accessible = true,
                    DoorNo = 101,
                    Floor = 1,
                    Hotel = hotel,
                    Reservations = new List<Reservation>(),
                    RoomType = roomType,
                    Status = RoomStatus.InUse
                };

                Reservation reservation = new Reservation()
                {
                    BoardType = BoardType.BedOnly,
                    EndDate = DateTime.Now.ToUniversalTime(),
                    Guests = new List<Guest>(),
                    Hotel = hotel,
                    PayFullfillment = false,
                    Price = roomType.Price,
                    Reservator = new Reservator()
                    {
                        Address = new Address()
                        {
                            Country = "Hungary",
                            Region = "Borsod-Abaúj-Zemplén",
                            PostalCode = "3900",
                            City = "Szerencs",
                            AddressLineOne = "Ondi út 2",
                            AddressLineTwo = ""
                        },
                        Name = "Name",
                    },
                    ReserveDate = DateTime.Now.ToUniversalTime(),
                    ReservedFor = 1,
                    Rooms = new List<Room>()
                    {
                        room
                    },
                    StartDate = DateTime.Now.ToUniversalTime()
                };

                room.Reservations.Add(reservation);

                _dbContext.Hotels.Add(hotel);
                _dbContext.Rooms.Add(room);
                _dbContext.SaveChanges();
            }
        }

        private Guest MakeGuestFromDto(GuestUpdateDto guest)
        {
            return new Guest()
            {
                Id = guest.Id,
                Address = guest.Address,
                BirthDate = guest.BirthDate,
                BirthPlace = guest.BirthPlace,
                Email = guest.Email,
                FirstName = guest.FirstName,
                Gender = guest.Gender,
                LastName = guest.LastName,
                Note = guest.Note,
                PersonalId = guest.PersonalId,
                Phone = guest.Phone,
                Status = guest.Status,
            };
        }
    }
}
