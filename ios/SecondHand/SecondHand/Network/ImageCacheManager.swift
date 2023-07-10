//
//  ImageCacheManager.swift
//  SecondHand
//
//  Created by 에디 on 2023/07/07.
//

import UIKit.UIImage
import Foundation

class ImageCacheManager {
    static let shared = NSCache<NSString, UIImage>()
    
    init() { }
}

extension UIImageView {
    /// imageUrlString을 이미지 cacheKey로 사용
    func loadImage(_ imageUrlString: String) {
        let cacheKey = NSString(string: imageUrlString)
        // 메모리 캐시에서 이미지 검색
        if let cachedImage = ImageCacheManager.shared.object(forKey: cacheKey) {
        self.image = cachedImage
        return
        }
        
        // url에서 이미지를 비동기 로드
        NetworkManager.shared.loadImage(from: imageUrlString) { image in
            guard let image = image else { return }
            ImageCacheManager.shared.setObject(image, forKey: cacheKey)
            DispatchQueue.main.async {
                self.image = image
            }
        }
    }
}
