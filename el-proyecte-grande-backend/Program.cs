using el_proyecte_grande_backend.Configurations;
using el_proyecte_grande_backend.Data;
using Microsoft.EntityFrameworkCore;
using el_proyecte_grande_backend.Services.GuestServices;
using el_proyecte_grande_backend.Services.HotelServices;
using el_proyecte_grande_backend.Services.ReservationServices;
using el_proyecte_grande_backend.Services.RoomServices;
using el_proyecte_grande_backend.Services.InventoryServices;

var builder = WebApplication.CreateBuilder(args);

string connectionString = builder.Configuration["ConnectionStrings:GrandeHotelConnection"];
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<GrandeHotelContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(options => options.AddPolicy("AllowAll", builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddSingleton<IGuestService>(x =>
    new GuestService(x.CreateScope().ServiceProvider.GetRequiredService<GrandeHotelContext>()));
builder.Services.AddScoped<IHotelService, HotelService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IInventoryService, InventoryService>();

builder.Services.AddAutoMapper(typeof(AutoMapperConfiguration));
builder.Services.AddTransient<DbInitializer>();


var app = builder.Build();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using var scope = app.Services.CreateScope();
IServiceProvider services = scope.ServiceProvider;
var initializer = services.GetRequiredService<DbInitializer>();
initializer.Seed();

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
