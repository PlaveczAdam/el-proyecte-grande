namespace el_proyecte_grande_backend.Models.Entities
{
	public class Address
	{
		public long Id { get; set; }
		public string PostalCode { get; set; }
		public string Country { get; set; }
		public string Region { get; set; }
		public string City { get; set; }
		public string AdressLineOne { get; set; }
		public string AdressLineTwo { get; set; }
	}
}
