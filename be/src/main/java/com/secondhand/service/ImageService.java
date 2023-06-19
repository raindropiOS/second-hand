package com.secondhand.service;

import com.secondhand.domain.image.Image;
import com.secondhand.domain.image.ImageRepository;
import com.secondhand.web.dto.response.ImageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@PropertySource("classpath:application-aws.yml")
public class ImageService {

    public static final String FILE_ROUTE = "images/test/";
    private final S3Client s3Client;
    private final ImageRepository imageRepository;

    @Value("${aws.s3.bucket}")
    private String bucket;

    public ImageResponse upload(MultipartFile multipartFile) throws IOException {
        String imageName = getImageName(multipartFile);
        String fileName = FILE_ROUTE + multipartFile.getOriginalFilename();
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(fileName)
                .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(multipartFile.getBytes()));

        String imageUrl = s3Client.utilities().getUrl(GetUrlRequest.builder()
                        .bucket(bucket)
                        .key(fileName)
                        .build())
                .toString();
        Image image = imageRepository.save(new Image(imageUrl));
        return new ImageResponse(image);
    }

    public String uploads(MultipartFile multipartFile) throws IOException {
        String imageName = getImageName(multipartFile);
        String fileName = FILE_ROUTE + multipartFile.getOriginalFilename();

        log.debug("fileName = {} ", fileName);
        log.debug("multipartFile = {} ", imageName);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(fileName)
                .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(multipartFile.getBytes()));

        String imageUrl = s3Client.utilities().getUrl(GetUrlRequest.builder()
                        .bucket(bucket)
                        .key(fileName)
                        .build())
                .toString();

        log.debug("imageUrl = {} ", imageUrl);
        Image image = imageRepository.save(new Image(imageUrl));
        ImageResponse imageResponse = new ImageResponse(image);
        return imageUrl;
    }


    private String getImageName(MultipartFile multipartFile) {
        String newName = UUID.randomUUID().toString();
        String originalFileName = multipartFile.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        return newName + extension;
    }
}
