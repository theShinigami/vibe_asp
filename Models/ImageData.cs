using System;

namespace Vibe.Models
{
    public class ImageData
    {
        public int Id { get; set; }
        public string PicLocation { get; set; }
        public string Hash { get; set; }
        public string UploadedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
    }
}
