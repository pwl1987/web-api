# HeyGem.ai 前端API文档

## 概述

HeyGem.ai前端使用Axios作为HTTP客户端，与后端服务进行交互。本文档详细说明了前端项目中的主要API接口及其用法。

## API基础设置

API基础URL配置位于`src/config/config.ts`文件中：

```typescript
export const serviceUrl: ServiceUrlConfig = {
  // 通过Vite代理转发的API请求路径
  baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  // 资源前缀，用于拼接资源URL
  assetPrefix: import.meta.env.VITE_API_TARGET || ''
}
```

## HTTP请求封装

API请求封装在`src/api/request.ts`文件中，提供了以下方法：

```typescript
// 封装请求方法
const request = {
  get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>,
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>>,
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>>,
  delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>
}
```

## 主要API模块

### 1. 模型管理API (`src/api/model.ts`)

用于处理模型相关操作，如创建、查询和删除模型。

#### 1.1 获取模型列表

```typescript
/**
 * 获取模型列表
 * @param params 查询参数
 * @returns 模型列表数据
 */
export const getModelList = (params: ModelListParams): Promise<ModelListResponse> => {
  return request.get('/api/models', { params });
};
```

#### 1.2 创建模型

```typescript
/**
 * 创建新模型
 * @param data 模型数据
 * @returns 创建结果
 */
export const createModel = (data: CreateModelParams): Promise<ModelResponse> => {
  return request.post('/api/models', data);
};
```

#### 1.3 删除模型

```typescript
/**
 * 删除模型
 * @param id 模型ID
 * @returns 删除结果
 */
export const deleteModel = (id: string): Promise<ApiResponse<null>> => {
  return request.delete(`/api/models/${id}`);
};
```

### 2. 视频处理API (`src/api/video.ts`)

用于处理视频相关操作，如上传、合成和查询视频。

#### 2.1 获取视频列表

```typescript
/**
 * 获取视频列表
 * @param params 查询参数
 * @returns 视频列表数据
 */
export const getVideoList = (params: VideoListParams): Promise<VideoListResponse> => {
  return request.get('/api/videos', { params });
};
```

#### 2.2 上传视频

```typescript
/**
 * 上传视频文件
 * @param file 视频文件
 * @param onProgress 进度回调
 * @returns 上传结果
 */
export const uploadVideo = (file: File, onProgress?: (percentage: number) => void): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  return request.post('/api/upload/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progressEvent => {
      if (progressEvent.total && onProgress) {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentage);
      }
    }
  });
};
```

#### 2.3 合成视频

```typescript
/**
 * 合成视频
 * @param data 合成参数
 * @returns 合成任务信息
 */
export const synthesizeVideo = (data: SynthesizeParams): Promise<SynthesizeResponse> => {
  return request.post('/api/videos/synthesize', data);
};
```

### 3. 语音处理API (`src/api/voice.ts`)

用于处理语音相关操作，如克隆、生成和管理语音。

#### 3.1 克隆语音

```typescript
/**
 * 克隆语音
 * @param data 语音克隆参数
 * @returns 克隆任务信息
 */
export const cloneVoice = (data: CloneVoiceParams): Promise<CloneVoiceResponse> => {
  return request.post('/api/voices/clone', data);
};
```

#### 3.2 生成语音

```typescript
/**
 * 文本转语音
 * @param data TTS参数
 * @returns 生成的语音信息
 */
export const textToSpeech = (data: TTSParams): Promise<TTSResponse> => {
  return request.post('/api/voices/tts', data);
};
```

### 4. 通用API (`src/api/index.ts`)

包含一些通用操作和工具函数。

#### 4.1 计数API

```typescript
/**
 * 获取视频数量
 * @returns 视频总数
 */
export const countVideo = (): Promise<number> => {
  return request.get('/api/stats/videos/count');
};

/**
 * 获取模型数量
 * @returns 模型总数
 */
export const countModel = (): Promise<number> => {
  return request.get('/api/stats/models/count');
};
```

## 客户端API模拟

在Web环境中，通过`src/client/web-client.ts`模拟Electron客户端API功能：

```typescript
// 文件处理 API
const file: FileAPI = {
  name: 'file',

  // 选择文件
  async selectFile(filters: FileFilter = {}): Promise<File | null> {
    // 实现文件选择逻辑
  },

  // 保存文件
  async saveFile(content: BlobPart, defaultName = ''): Promise<string> {
    // 实现文件保存逻辑
  }
};
```

## 使用示例

### 获取模型列表示例

```typescript
import { getModelList } from '@/api/model';

// 在组件中使用
const fetchModels = async () => {
  try {
    const params = {
      page: 1,
      pageSize: 10
    };
    const response = await getModelList(params);
    // 处理响应数据
    console.log(response.data);
  } catch (error) {
    console.error('获取模型列表失败:', error);
  }
};
```

### 上传视频示例

```typescript
import { uploadVideo } from '@/api/video';

// 在组件中使用
const handleFileUpload = async (file: File) => {
  try {
    const response = await uploadVideo(file, (progress) => {
      console.log(`上传进度: ${progress}%`);
    });
    // 处理响应数据
    console.log('上传成功:', response);
  } catch (error) {
    console.error('上传视频失败:', error);
  }
};
``` 