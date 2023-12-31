﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using el_proyecte_grande_backend.Data;

#nullable disable

namespace elproyectegrandebackend.Migrations
{
    [DbContext(typeof(GrandeHotelContext))]
    [Migration("20230201145030_AddIsCancelledPropertyToReservation")]
    partial class AddIsCancelledPropertyToReservation
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("GuestReservation", b =>
                {
                    b.Property<long>("GuestsId")
                        .HasColumnType("bigint");

                    b.Property<long>("ReservationsId")
                        .HasColumnType("bigint");

                    b.HasKey("GuestsId", "ReservationsId");

                    b.HasIndex("ReservationsId");

                    b.ToTable("GuestReservation");
                });

            modelBuilder.Entity("ReservationRoom", b =>
                {
                    b.Property<long>("ReservationsId")
                        .HasColumnType("bigint");

                    b.Property<long>("RoomsId")
                        .HasColumnType("bigint");

                    b.HasKey("ReservationsId", "RoomsId");

                    b.HasIndex("RoomsId");

                    b.ToTable("ReservationRoom");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Accessory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("Quantity")
                        .HasColumnType("bigint");

                    b.Property<long>("RoomTypeId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("RoomTypeId");

                    b.ToTable("Accessories");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Address", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("AddressLineOne")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AddressLineTwo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Region")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Guest", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("AddressId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("BirthPlace")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Gender")
                        .HasColumnType("integer");

                    b.Property<long>("HotelId")
                        .HasColumnType("bigint");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PersonalId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("RoomId")
                        .HasColumnType("bigint");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.HasIndex("HotelId");

                    b.HasIndex("RoomId");

                    b.ToTable("Guests");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Hotel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("AddressId")
                        .HasColumnType("bigint");

                    b.Property<int>("Classification")
                        .HasColumnType("integer");

                    b.Property<long>("Floor")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("Rooms")
                        .HasColumnType("bigint");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Hotels");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Inventory", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("HotelId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("HotelId");

                    b.ToTable("Inventories");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Item", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("Amount")
                        .HasColumnType("bigint");

                    b.Property<long>("InventoryId")
                        .HasColumnType("bigint");

                    b.Property<int>("ItemType")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<long>("RequiredAmount")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("InventoryId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Reservation", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<int>("BoardType")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("HotelId")
                        .HasColumnType("bigint");

                    b.Property<bool>("PayFullfillment")
                        .HasColumnType("boolean");

                    b.Property<int?>("PaymentMethod")
                        .HasColumnType("integer");

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.Property<long>("ReservatorId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("ReserveDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<long>("ReservedFor")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("isCancelled")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("HotelId");

                    b.HasIndex("ReservatorId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Reservator", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("AddressId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Reservators");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Room", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<bool>("Accessible")
                        .HasColumnType("boolean");

                    b.Property<int>("DoorNo")
                        .HasColumnType("integer");

                    b.Property<int>("Floor")
                        .HasColumnType("integer");

                    b.Property<long>("HotelId")
                        .HasColumnType("bigint");

                    b.Property<long>("RoomTypeId")
                        .HasColumnType("bigint");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("HotelId");

                    b.HasIndex("RoomTypeId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.RoomType", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Price")
                        .HasColumnType("double precision");

                    b.Property<int>("RoomQuality")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("RoomTypes");
                });

            modelBuilder.Entity("GuestReservation", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Guest", null)
                        .WithMany()
                        .HasForeignKey("GuestsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Reservation", null)
                        .WithMany()
                        .HasForeignKey("ReservationsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ReservationRoom", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Reservation", null)
                        .WithMany()
                        .HasForeignKey("ReservationsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Room", null)
                        .WithMany()
                        .HasForeignKey("RoomsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Accessory", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.RoomType", "RoomType")
                        .WithMany("Accessories")
                        .HasForeignKey("RoomTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RoomType");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Guest", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Hotel", "Hotel")
                        .WithMany()
                        .HasForeignKey("HotelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");

                    b.Navigation("Hotel");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Hotel", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Inventory", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Hotel", "Hotel")
                        .WithMany()
                        .HasForeignKey("HotelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Hotel");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Item", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Inventory", "Inventory")
                        .WithMany("Items")
                        .HasForeignKey("InventoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Inventory");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Reservation", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Hotel", "Hotel")
                        .WithMany()
                        .HasForeignKey("HotelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Reservator", "Reservator")
                        .WithMany()
                        .HasForeignKey("ReservatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Hotel");

                    b.Navigation("Reservator");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Reservator", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Address");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Room", b =>
                {
                    b.HasOne("el_proyecte_grande_backend.Models.Entities.Hotel", "Hotel")
                        .WithMany()
                        .HasForeignKey("HotelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("el_proyecte_grande_backend.Models.Entities.RoomType", "RoomType")
                        .WithMany()
                        .HasForeignKey("RoomTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Hotel");

                    b.Navigation("RoomType");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.Inventory", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("el_proyecte_grande_backend.Models.Entities.RoomType", b =>
                {
                    b.Navigation("Accessories");
                });
#pragma warning restore 612, 618
        }
    }
}
