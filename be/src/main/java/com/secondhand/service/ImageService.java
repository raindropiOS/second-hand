package com.secondhand.service;

import com.secondhand.domain.exception.ImageCountException;
import com.secondhand.domain.exception.ImageUploadFailException;
import com.secondhand.domain.image.Image;
import com.secondhand.domain.image.ImageRepository;
import com.secondhand.domain.product.Product;
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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@PropertySource("classpath:application-aws.yml")
public class ImageService {

    public static final String FILE_ROUTE = "images/products/";
    private final S3Client s3Client;
    private final ImageRepository imageRepository;

    @Value("${aws.s3.bucket}")
    private String bucket;

    public List<String> uploadImageList(List<MultipartFile> list) {
        if (list.size() < 1 || list.size() > 10) {
            throw new ImageCountException("이미지 첨부는 1개 이상 10개 이하로 해야합니다.");
        }

        List<String> images = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            String uploadImage = upload(list.get(i));
            images.add(uploadImage);
        }
        return images;
    }

//    public String getThumbnailUrl(List<MultipartFile> list) {
//        if (list.size() < 1 || list.size() > 10) {
//            throw new ImageCountException("이미지 첨부는 1개 이상 10개 이하로 해야합니다.");
//        }
//
//        String thumbnailUrl = new ArrayList<>();
//        for (int i = 0; i < list.size(); i++) {
//            String uploadImage = upload(list.get(i));
//            images.add(uploadImage);
//        }
//        return thumbnailUrl;
//    }

    public String upload(MultipartFile multipartFile) {
        String imageName = getImageName(multipartFile);
        String fileName = FILE_ROUTE + multipartFile.getOriginalFilename();
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(fileName)
                .build();
        try {
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(multipartFile.getBytes()));
        } catch (IOException e) {
            throw new ImageUploadFailException("물품 사진 업로드에 실패하였습니다.");
        }

        return s3Client.utilities().getUrl(GetUrlRequest.builder()
                        .bucket(bucket)
                        .key(fileName)
                        .build())
                .toString();
    }

    private String getImageName(MultipartFile multipartFile) {
        String newName = UUID.randomUUID().toString();
        String originalFileName = multipartFile.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        return newName + extension;
    }

    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

}
