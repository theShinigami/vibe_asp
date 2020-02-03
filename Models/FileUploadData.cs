using System;
using Microsoft.AspNetCore.Http;

namespace Vibe.Models
{
    public class FileUploadData
    {
        public IFormFile files { get; set; }
    }
}
