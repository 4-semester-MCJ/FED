 using System.Collections.ObjectModel;
using Microsoft.Maui.Controls;
using SelectImages.Data;
using SQLite;
 
 namespace SelectImages.Models
 {
 public class ImageInfo
    {
        [PrimaryKey, AutoIncrement]
		public int Id { get; set; }	
		public string? ImagePath { get; set; }
        public string? ImageTitle { get; set; }
        public string? Description { get; set; }
	}
 }