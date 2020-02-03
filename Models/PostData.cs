using System;

namespace Vibe.Models
{
    public class PostData
    {
        public int Id { get; set; }
        public string Fullname { get; set; }
        public string PosterPicture { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Country { get; set; }
        public int Payment { get; set; }
        public int Like { get; set; }
        public int ImgId { get; set; }
        public string Caption { get; set; }
        public string Status { get; set; }
    }
}
