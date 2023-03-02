﻿using el_proyecte_grande_backend.Models.Dtos.GuestDtos;
using el_proyecte_grande_backend.Models.Dtos.RoomDtos;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend_test
{
    public static class TestDataCreator
    {
        public static Hotel CreateTestHotel(int id)
        {
            var hotel = new Hotel()
            {
                Id = id,
                Name = $"New Hotel {id}",
                Status = HotelStatus.InUse,
                Classification = Classification.Tourist,
                Floor = 10,
                Rooms = 10,
                Address = new Address()
                {
                    Id = id,
                    PostalCode = "1234",
                    Country = "France",
                    Region = "Baguette",
                    City = "Paris",
                    AddressLineOne = "Something st.",
                    AddressLineTwo = "421"
                }
            };
            return hotel;
        }

        public static Guest CreateTestGuest(int id)
        {
            var guest = new Guest()
            {
                Id = id,
                FirstName = $"Rob {id}",
                LastName = "Bor",
                BirthPlace = "Ye",
                Email = "No",
                Note = "Der",
                PersonalId = "123fewrfw",
                Phone = "141324213",
                Address = new Address { Id = 1 },
            };
            return guest;
        }

        public static GuestUpdateDto CreateTestGuestUpdateDto(int id)
        {
            var guest = new GuestUpdateDto()
            {
                Id = id,
                FirstName = $"Rob {id}",
                LastName = "Bor",
                BirthPlace = "Ye",
                Email = "No",
                Note = "Der",
                PersonalId = "123fewrfw",
                Phone = "141324213",
            };
            return guest;
        }

        public static User CreateTestUser(int id)
        {
            var user = new User()
            {
                Id = id,
                Name = $"Rob {id}",
                Email = "Bor",
                Password = "Ye",
                IsActive = true,
                Roles = new List<Role> { }
            };
            return user;
        }

        public static Role CreateTestRole(int id)
        {
            var role = new Role
            {
                Id = 1,
                Name = "A"
            };
            return role;
        }
        public static Reservation CreateTestReservation(int id)
        {
            var reservation = new Reservation
            {
                Id = id,
                ReservedFor = 1,
                ReserveDate = DateTime.Now,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                PayFullfillment = true,
                BoardType = BoardType.FullBoard,
                PaymentMethod = PaymentMethod.CreditCard,
                isCancelled = false
            };
            return reservation;
        }
        public static NewRoom CreateTestNewRoom(int id)
        {
            var room = new NewRoom
            {
                Id = id,
                Floor = 1,
                DoorNo = 1,
                Accessible = true,
                HotelId = 1,
                RoomTypeId = 1,
                Status = RoomStatus.InUse
            };
            return room;
        }

        public static NewRoomType CreateTestNewRoomType(int id)
        {
            var roomType = new NewRoomType
            {
                Name = $"RoomType {id}",
                Price = 1,
                RoomQuality = RoomQuality.Comfort,
            };
            return roomType;
        }

        public static NewAccessory CreateTestNewAccessory(int id)
        {
            var newAccessory = new NewAccessory
            {
                Name = $"A {id}",
                Quantity = 10,
                RoomTypeId = 1
            };
            return newAccessory;
        }

        public static Inventory CreateTestInventory(int id)
        {
            var inventory = new Inventory
            {
                Id = id,
                Items = new List<Item>()
            };
            return inventory;
        }

        public static Item CreateTestItem(int id)
        {
            var item = new Item
            {
                Id = id,
                Amount = 1,
                ItemType = ItemType.Furniture,
                Name = "B",
                RequiredAmount = 1,
            };
            return item;
        }
    }
}
