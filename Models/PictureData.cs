using System;

namespace Vibe.Models
{
    public class PictureData
    {
        public int Id { get; set; }
        public string PictureLocation { get; set; }
        public string Hash { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
    }
}
